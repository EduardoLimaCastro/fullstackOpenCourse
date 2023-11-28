/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import Persons from "./components/Persons/Persons";
import Filter from "./components/FIlter/Filter";
import PersonForm from "./components/PersonForm/PersonForm";
import phoneBookService from "./services/phoneBookServices";
import NotificationError from "./components/NotificationMessage/NotificationError";
import NotificationSucsess from "./components/NotificationMessage/NotificationSucsess";
import "./app.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [query, setQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [sucsessMessage, setSucsessMessage] = useState(null);

  useEffect(() => {
    console.log("effect");
    phoneBookService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const updatePhoneBook = () => {
    if (
      window.confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`
      )
    ) {
      persons.map((person) => {
        if (newName === person.name) {
          const equal = persons.find((n) => n.name === newName);
          const changedPerson = { ...equal, number: newNumber };

          phoneBookService
            .update(changedPerson, person.id)
            .then((returnedPerson) => {
              setPersons(
                persons.map((person) =>
                  person.name !== newName ? person : returnedPerson
                )
              );
            });
        }
      });
    }
  };

  const createPhoneBook = () => {
    const phonebookData = {
      name: newName,
      number: newNumber,
    };

    phoneBookService.create(phonebookData).then((response) => {
      setPersons(persons.concat(response.data));
    });
  };

  const addPhoneBook = (event) => {
    event.preventDefault();
    let compare = false;
    persons.map((person) => {
      if (person.name === newName) {
        try {
          compare = true;
          updatePhoneBook();
          setSucsessMessage(`${person.name} updated successfully`);
          setTimeout(() => {
            setSucsessMessage(null);
          }, 5000);
        } catch (error) {
          setErrorMessage(`Error updating ${person.name}`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        }
      }
    });
    if (!compare) {
      try {
        createPhoneBook();
        setSucsessMessage(`${person.name} added successfully`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      } catch (error) {
        setErrorMessage(`Error creating ${person.name} data`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    }
  };
  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const searchEngine = (r) => {
    setQuery(r);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <NotificationError message={errorMessage}></NotificationError>
      <NotificationSucsess message={sucsessMessage}></NotificationSucsess>
      <Filter handleResultSearch={searchEngine}></Filter>
      <h2>Add a new</h2>
      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        name={newName}
        number={newNumber}
        addPerson={addPhoneBook}
      ></PersonForm>
      <h2>Numbers</h2>
      {persons
        .filter((person) => {
          if (query === "") {
            return person;
          } else if (person.name.toLowerCase().includes(query.toLowerCase())) {
            return person;
          }
        })
        .map((person) => {
          return (
            <Persons
              key={person.id}
              name={person.name}
              number={person.number}
              id={person.id}
            ></Persons>
          );
        })}
    </div>
  );
};

export default App;
