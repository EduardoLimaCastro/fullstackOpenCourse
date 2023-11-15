/* eslint-disable react/prop-types */

import Content from "../Content/Content";
import Header from "../Header/Header";

const Course = ({ name, parts }) => {
  //console.log(course)
  //console.log(course.parts)
  return (
    <>
      <Header name={name}></Header>
      <Content data={parts}></Content>
    </>
  );
};

export default Course;
