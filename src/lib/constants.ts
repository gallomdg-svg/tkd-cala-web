export const GRADUACIONES = [
  {
    key: 1,
    label: "Cinturón blanco",
    base: "#ffffff",
    punta: null,
  },
  {
    key: 2,
    label: "Blanco punta amarilla",
    base: "#ffffff",
    punta: "#facc15",
  },
  {
    key: 3,
    label: "Amarillo",
    base: "#facc15",
    punta: null,
  },
  {
    key: 4,
    label: "Amarillo punta verde",
    base: "#facc15",
    punta: "#22c55e",
  },
  {
    key: 5,
    label: "Verde",
    base: "#22c55e",
    punta: null,
  },
  {
    key: 6,
    label: "Verde punta azul",
    base: "#22c55e",
    punta: "#3b82f6",
  },
  {
    key: 7,
    label: "Azul",
    base: "#3b82f6",
    punta: null,
  },
  {
    key: 8,
    label: "Azul punta roja",
    base: "#3b82f6",
    punta: "#ef4444",
  },
  {
    key: 9,
    label: "Rojo",
    base: "#ef4444",
    punta: null,
  },
  {
    key: 10,
    label: "Rojo punta negra",
    base: "#ef4444",
    punta: "#000000",
  },
  {
    key: 11,
    label: "Negro 1° Dan",
    base: "#000000",
    punta: null,
  },
  {
    key: 12,
    label: "Negro 2° Dan",
    base: "#000000",
    punta: null,
  },
    {
    key: 13,
    label: "Negro 3° Dan",
    base: "#000000",
    punta: null,
  },
    {
    key: 14,
    label: "Negro 4° Dan",
    base: "#000000",
    punta: null,
  },
    {
    key: 15,
    label: "Negro 5° Dan",
    base: "#000000",
    punta: null,
  },
    {
    key: 16,
    label: "Negro 6° Dan",
    base: "#000000",
    punta: null,
  },
    {
    key: 17,
    label: "Negro 7° Dan",
    base: "#000000",
    punta: null,
  },
    {
    key: 18,
    label: "Negro 8° Dan",
    base: "#000000",
    punta: null,
  },
    {
    key: 19,
    label: "Negro 9° Dan",
    base: "#000000",
    punta: null,
  },
];


export const TURNOS = [
  {
    key: 1,
    label: "Infantiles",
  },
  {
    key: 2,
    label: "Juveniles",
  },
  {
    key: 3,
    label: "Adolescentes y Adultos",
  },
] as const;

export type TurnoKey = (typeof TURNOS)[number]["key"];

export function getTurnoLabel(turno: number | string) {
  const key = Number(turno);
  return TURNOS.find((t) => t.key === key)?.label ?? null;
}