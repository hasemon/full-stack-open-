/* eslint-disable react/prop-types */


export function Persons({ filteredPersons, handleDelete }) {
  return (
    <div>
      <ol>
        {filteredPersons.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}
            <button onClick={()=> handleDelete(person.id)} >Delete</button>
          </li>

        ))}
      </ol>
    </div>
  );
}
