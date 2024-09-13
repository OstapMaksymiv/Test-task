import React, { useEffect, useState } from "react";
import { useTypedSelector } from "../hooks/userTypedSelector";
import { useActions } from "../hooks/useAction";
import "./UserList.css";
import { Customer, SearchedCustomer } from "../types/user";
const UserList: React.FC = () => {
  const { users, error, loading } = useTypedSelector((state) => state.user);
  const [searchedPerson, setSearchedPerson] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
  });
  const [addedUser, setAddedUser] = useState({
    id: 0,
    name: "",
    username: "",
    email: "",
    phone: "",
  });
  function handleChangeSearchedPerson(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setSearchedPerson((prevData: SearchedCustomer) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }
  function handleChangeAddedUser(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setAddedUser((prevData: Customer) => {
      return {
        ...prevData,
        id: users.length + 1,
        [name]: value,
      };
    });
  }

  const { fetchUsers, searchUsers, addUser } = useActions();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    searchUsers(searchedPerson);
  }, [searchedPerson, addedUser]);

  if (loading) {
    return (
      <div className="loading-block">
        <h1>Fetching data, please wait...</h1>
        <span className="loader"></span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="loading-block">
        <h1>{error} :(</h1>
      </div>
    );
  }

  return (
    <div className="admin-panel container">
      <div className="adding-block">
        <h2>Add Panel</h2>
        <form
          className="adding-form"
          onSubmit={(e) => {
            e.preventDefault();
            addUser(addedUser);
            setAddedUser({
              id: 0,
              name: "",
              username: "",
              email: "",
              phone: "",
            });
          }}
        >
          <article className="input-block">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              required
              value={addedUser.name}
              placeholder="Name"
              onChange={(e) => handleChangeAddedUser(e)}
            />
          </article>
          <article className="input-block">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              required
              name="username"
              value={addedUser.username}
              placeholder="Username"
              onChange={(e) => handleChangeAddedUser(e)}
            />
          </article>
          <article className="input-block">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              required
              name="email"
              value={addedUser.email}
              placeholder="Email"
              onChange={(e) => handleChangeAddedUser(e)}
            />
          </article>
          <article className="input-block">
            <label htmlFor="phone">Phone</label>
            <input
              type="string"
              required
              name="phone"
              value={addedUser.phone}
              placeholder="Phone"
              onChange={(e) => handleChangeAddedUser(e)}
            />
          </article>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="mainBlock">
        <section className="search-panel">
          <h2>Search Panel</h2>
          <article className="input-block">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              required
              value={searchedPerson.name}
              placeholder="Name"
              onChange={(e) => handleChangeSearchedPerson(e)}
            />
          </article>
          <article className="input-block">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              required
              name="username"
              value={searchedPerson.username}
              placeholder="Username"
              onChange={(e) => handleChangeSearchedPerson(e)}
            />
          </article>
          <article className="input-block">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              required
              name="email"
              value={searchedPerson.email}
              placeholder="Email"
              onChange={(e) => handleChangeSearchedPerson(e)}
            />
          </article>
          <article className="input-block">
            <label htmlFor="phone">Phone</label>
            <input
              type="string"
              required
              name="phone"
              value={searchedPerson.phone}
              placeholder="Phone"
              onChange={(e) => handleChangeSearchedPerson(e)}
            />
          </article>
        </section>
        <div className="table">
          <div className="table-header">
            <div className="header__item">
              <p id="name" className="filter__link">
                Name
              </p>
            </div>
            <div className="header__item">
              <p id="wins" className="filter__link filter__link--number">
                Username
              </p>
            </div>
            <div className="header__item">
              <p id="draws" className="filter__link filter__link--number">
                Email
              </p>
            </div>
            <div className="header__item">
              <p id="losses" className="filter__link filter__link--number">
                Phone
              </p>
            </div>
          </div>
          <div className="table-content">
            {users.map((user) => (
              <div key={user.id} className="table-row">
                <div className="table-data">{user.name}</div>
                <div className="table-data">{user.username}</div>
                <div className="table-data">{user.email}</div>
                <div className="table-data">{user.phone}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
