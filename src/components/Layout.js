import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const MainComponent = styled.div``;

function Layout({ children }) {
  const router = useRouter();
  return (
    <TransitionGroup component={null}>
      <CSSTransition key={router.asPath} classNames="page" timeout={1000}>
        <MainComponent>{children}</MainComponent>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default Layout;
