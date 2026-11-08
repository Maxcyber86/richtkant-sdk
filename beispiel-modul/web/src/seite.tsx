/**
 * Seite „Prüfpunkte“ des Beispielmoduls. Bausteine der Oberfläche ausschließlich aus `@gm/web/sdk` (einheitliches
 * Designsystem, Barrierefreiheit nach WCAG 2.2 AA: sichtbare Beschriftungen, Tastaturbedienung, Statusmeldungen).
 */
import { useState, type FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { modulFunktion } from '@gm/core';
import { AbfrageFehler, Badge, Button, EmptyState, NumberInput, PageHeader, Spinner, Table, TestBadge, TextInput, api, errorMessage, formatDate, useToast } from '@gm/web/sdk';
import { PRUEF_STATUS_LABEL, type PruefpunktAnsicht } from '@rk-modul/beispiel-core';

const TON = { faellig: 'err', bald_faellig: 'warn', in_ordnung: 'float', nie_geprueft: 'neutral' } as const;

export function PruefpunkteSeite() {
  const qc = useQueryClient();
  const toast = useToast();
  const liste = useQuery({ queryKey: ['beispiel', 'pruefpunkte'], queryFn: ({ signal }) => api.get<PruefpunktAnsicht[]>('/beispiel/pruefpunkte', signal) });
  const [bezeichnung, setBezeichnung] = useState('');
  const [intervall, setIntervall] = useState<number | null>(30);
  const anlegen = useMutation({
    mutationFn: () => api.post<PruefpunktAnsicht>('/beispiel/pruefpunkte', { bezeichnung, intervallTage: intervall }),
    onSuccess: () => {
      setBezeichnung('');
      void qc.invalidateQueries({ queryKey: ['beispiel', 'pruefpunkte'] });
      toast('ok', 'Prüfpunkt angelegt.');
    },
    onError: (e) => toast('err', errorMessage(e)),
  });
  const geprueft = useMutation({
    mutationFn: (id: string) => api.post<PruefpunktAnsicht>(`/beispiel/pruefpunkte/${id}/geprueft`, {}),
    onSuccess: () => void qc.invalidateQueries({ queryKey: ['beispiel', 'pruefpunkte'] }),
    onError: (e) => toast('err', errorMessage(e)),
  });
  const absenden = (e: FormEvent) => {
    e.preventDefault();
    anlegen.mutate();
  };

  return (
    <div className="space-y-5">
      <PageHeader funktion={modulFunktion('betriebsmittel.pruefpunkte')} />
      <form onSubmit={absenden} className="flex flex-wrap items-end gap-3" aria-label="Prüfpunkt anlegen">
        <TextInput label="Bezeichnung" value={bezeichnung} onChange={(e) => setBezeichnung(e.target.value)} required minLength={2} maxLength={120} />
        <NumberInput label="Prüfintervall" unit="Tage" digits={0} min={1} max={3650} value={intervall} onChange={setIntervall} required />
        <Button type="submit" variant="primary" busy={anlegen.isPending} disabled={bezeichnung.trim().length < 2 || !intervall}>
          Anlegen
        </Button>
      </form>
      {liste.isPending ? (
        <Spinner />
      ) : liste.isError ? (
        <AbfrageFehler fehler={liste.error} erneut={() => void liste.refetch()} />
      ) : liste.data.length === 0 ? (
        <EmptyState title="Noch keine Prüfpunkte">Legen Sie oben den ersten Prüfpunkt an.</EmptyState>
      ) : (
        <Table>
          <thead>
            <tr>
              <th scope="col">Bezeichnung</th>
              <th scope="col">Intervall</th>
              <th scope="col">Letzte Prüfung</th>
              <th scope="col">Fällig am</th>
              <th scope="col">Status</th>
              <th scope="col">
                <span className="sr-only">Aktion</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {liste.data.map((p) => (
              <tr key={p.id}>
                <td>
                  {p.bezeichnung} <TestBadge show={p.isTest} />
                </td>
                <td>{p.intervallTage} Tage</td>
                <td>{p.letztePruefung ? formatDate(p.letztePruefung) : '–'}</td>
                <td>{p.faelligAm ? formatDate(p.faelligAm) : '–'}</td>
                <td>
                  <Badge tone={TON[p.status]}>{PRUEF_STATUS_LABEL[p.status]}</Badge>
                </td>
                <td>
                  <Button size="sm" busy={geprueft.isPending && geprueft.variables === p.id} onClick={() => geprueft.mutate(p.id)} aria-label={`${p.bezeichnung} als geprüft markieren`}>
                    Geprüft
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
