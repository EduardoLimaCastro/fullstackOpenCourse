import phoneBookServices from "../../services/phoneBookServices";

const Persons = ({ name, number, id }) => {
  const deleteOnClick = () => {
    phoneBookServices
      .deleteData(id)
      .then(window.confirm("do you want to delete?"));
  };

  return (
    <div>
      {name} {number} <button onClick={deleteOnClick}>delete</button>
    </div>
  );
};

export default Persons;
