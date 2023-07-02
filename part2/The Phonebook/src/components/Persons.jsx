/* eslint-disable react/prop-types */


export function Persons({ filteredPersons }) {
  return (
    <div>
      <ol>
        {filteredPersons.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}
          </li>
        ))}
      </ol>
    </div>
  );
}
