import React, { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Transition } from "react-transition-group";
import styled, { css } from "styled-components";

interface Children {
  children: ReactNode;
  isModalOpen: boolean;
  handleIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalWrapper = styled.div<{ $state: string }>`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 150;
  transition: all 0.5s;
  ${(props) => {
    switch (props.$state) {
      case "entering":
        return css`
          background-color: var(--color-black-modal-enter);
          &:first-child {
            opacity: 1;
          }
        `;
      case "entered":
        return css`
          background-color: var(--color-black-modal-enter);
          &:first-child {
            opacity: 1;
          }
        `;
      case "exiting":
        return css`
          background-color: var(--color-black-modal-exit);
          &:first-child {
            opacity: 0;
          }
        `;
      case "exiting":
        return css`
          background-color: var(--color-black-modal-exit);
          &:first-child {
            opacity: 0;
          }
        `;
    }
  }};
`;

export default function Modal({ children, isModalOpen, handleIsModalOpen }: Children) {
  // 모달이 열렸을 때, 배경화면 이동 금지
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isModalOpen]);

  // Overlay 클릭 시 모달 닫힘 X
  const handleClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) handleIsModalOpen((prev) => !prev);
  };

  return (
    <Transition in={isModalOpen} timeout={500} mountOnEnter unmountOnExit classNames="modal">
      {(state) =>
        createPortal(
          <ModalWrapper onClick={handleClick} $state={state}>
            {children}
          </ModalWrapper>,
          document.getElementById("modal-root") as HTMLDivElement
        )
      }
    </Transition>
  );
}
