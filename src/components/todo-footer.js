import React from "react";
import { STATUS } from "../constant";
import { capitalize } from "../util";
import styled from "styled-components";

const TodoFooter = (props) => {
  const { todos, updateStatus, clearCompleted } = props;
  const unfinishedItemsCount = todos.filter((todo) => !todo.done).length;
  const itemText = unfinishedItemsCount > 1 ? "items" : "item";
  const haveCompletedItem = todos.length - unfinishedItemsCount > 0;

  return todos.length > 0 ? (
    <Footer>
      <span>{`${unfinishedItemsCount} ${itemText} left`}</span>
      <Filters>
        {Object.keys(STATUS).map((statusKey) => {
          return (
            <li key={statusKey}>
              <a
                href="#/"
                onClick={() => {
                  updateStatus(STATUS[statusKey]);
                }}
              >
                {capitalize(STATUS[statusKey])}
              </a>
            </li>
          );
        })}
      </Filters>
      <button
        className="ClearCompleted"
        onClick={() => {
          clearCompleted();
        }}
      >
        {haveCompletedItem ? "clear completed" : ""}
      </button>
    </Footer>
  ) : null;
};

export default TodoFooter;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  color: #777;
  padding: 10px 15px;
  height: 20px;
  text-align: center;
  border-top: 1px solid #e6e6e6;

  &:before {
    content: "";
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 50px;
    overflow: hidden;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
      0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,
      0 17px 2px -6px rgba(0, 0, 0, 0.2);
  }
  span {
    text-align: left;
  }
  .ClearCompleted {
    position: relative;
    line-height: 20px;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Filters = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  position: absolute;
  right: 0;
  left: 0;

  li {
    display: inline;

    a {
      color: inherit;
      margin: 3px;
      padding: 3px 7px;
      text-decoration: none;
      border-radius: 3px;
      border: 1px solid transparent;

      &:hover {
        border: 1px solid rgba(175, 47, 47, 0.1);
      }

      a.selected {
        border-color: rgba(175, 47, 47, 0.2);
      }
    }
  }
`;

// const ClearCompleted = styled.button`
//   position: relative;
//   line-height: 20px;
//   text-decoration: none;
//   cursor: pointer;

//   &:hover {
//     text-decoration: underline;
//   }
// `;
