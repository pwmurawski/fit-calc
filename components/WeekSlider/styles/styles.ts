import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled(motion.section)`
  display: flex;
  align-items: center;
  width: 100%;
  max-height: 90px;
  min-height: 64px;
  height: calc(0.3 * 100vw);
  padding-bottom: 5px;
`;

export const Week = styled(motion.div)`
  display: flex;
  align-items: center;
  min-width: 100%;
  height: 100%;
  cursor: pointer;
  user-select: none;
`;
