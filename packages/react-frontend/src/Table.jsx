// src/Table.jsx
function TableHeader() {
    return (
      <thead>
        <tr>
          <th>Name</th>
          <th>Job</th>
        </tr>
      </thead>
    );
  }
  
function TableBody(props) {
const rows = props.characterData.map((row, index) => {
    return (
        <tr key={row.id}>
        <td>{row.name}</td>
        <td>{row.job}</td>
        <td>
            <button onClick={() => props.removeCharacter(row)}> {/* Pass the current row object */}
                Delete
            </button>
        </td>
    </tr>
    );
    }
    );
    return (
        <tbody>
        {rows}
        </tbody>
    );
}
  
function Table(props) {
return (
    <table>
    <TableHeader />
    <TableBody
        characterData={props.characterData}
        removeCharacter={props.removeCharacter}
    />
    </table>
);
}
export default Table;