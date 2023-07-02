/* eslint-disable react/prop-types */


export function PersonForm({ handleOnSubmit, newName, handleNameChange, newNumber, handleAddNumber }) {
  return (
    <form onSubmit={handleOnSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleAddNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}
