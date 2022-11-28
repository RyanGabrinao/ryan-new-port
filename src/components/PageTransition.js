import React from "react";
import styled from "styled-components";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const MainComponent = styled.div``;

function PageTransition({ children, route }) {
  const onPageExit = (el) => {};
  return (
    // <TransitionGroup component={null}>
    <CSSTransition key={route} classNames="page" timeout={1000}>
      <MainComponent>{children}</MainComponent>
    </CSSTransition>
    // </TransitionGroup>
  );
}

export default PageTransition;
