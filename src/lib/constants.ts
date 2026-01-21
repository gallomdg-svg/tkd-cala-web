export const GRADUACIONES = [
  {
    key: 1,
    label: "Cinturón blanco",
    color: "bg-white text-black border",
  },
  {
    key: 2,
    label: "Cinturón blanco punta amarilla",
    color: "bg-yellow-100 text-yellow-900",
  },
  {
    key: 3,
    label: "Cinturón amarillo",
    color: "bg-yellow-300 text-yellow-900",
  },
  {
    key: 4,
    label: "Cinturón amarillo punta verde",
    color: "bg-green-100 text-green-900",
  },
  {
    key: 5,
    label: "Cinturón verde",
    color: "bg-green-300 text-green-900",
  },
  {
    key: 6,
    label: "Cinturón verde punta azul",
    color: "bg-blue-100 text-blue-900",
  },
  {
    key: 7,
    label: "Cinturón azul",
    color: "bg-blue-300 text-blue-900",
  },
  {
    key: 8,
    label: "Cinturón azul punta roja",
    color: "bg-red-100 text-red-900",
  },
  {
    key: 9,
    label: "Cinturón rojo",
    color: "bg-red-300 text-red-900",
  },
  {
    key: 10,
    label: "Cinturón rojo punta negra",
    color: "bg-black text-white",
  },
  {
  key: 11,
  label: "Cinturón negro 1° Dan",
  color: "bg-black text-white",
},
{
  key: 12,
  label: "Cinturón negro 2° Dan",
  color: "bg-black text-white",
},
{
  key: 13,
  label: "Cinturón negro 3° Dan",
  color: "bg-black text-white",
},
{
  key: 14,
  label: "Cinturón negro 4° Dan",
  color: "bg-black text-white",
},
{
  key: 15,
  label: "Cinturón negro 5° Dan",
  color: "bg-black text-white",
},
{
  key: 16,
  label: "Cinturón negro 6° Dan",
  color: "bg-black text-white",
},
];


export const TURNOS = [
  "Infantiles",
  "Juveniles",
  "Adolescentes y Adultos",
] as const;

export type Turno = (typeof TURNOS)[number];

export function getGraduacionLabel(graduacion: string | number) {
  const key = Number(graduacion);

  const grad = GRADUACIONES.find(
    (g) => g.key === key
  );

  return grad?.label ?? null;
}
