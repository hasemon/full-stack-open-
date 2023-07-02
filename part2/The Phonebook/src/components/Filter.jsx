/* eslint-disable react/prop-types */


export function Filter({ filterName , handleFilterName }) {
  return (
    <div>
      filter shown with: <input value={filterName} onChange={handleFilterName} />
    </div>
  );
}


