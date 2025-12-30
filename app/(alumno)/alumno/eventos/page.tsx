export default function EventosAlumno() {
  return (
    <div>
      <h2>Eventos</h2>

      <table border={1} cellPadding={5}>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Evento</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>15/03</td>
            <td>Examen</td>
            <td>Cinturones</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
