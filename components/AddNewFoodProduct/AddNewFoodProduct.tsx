import { Container, PlusIcon } from "./styles/styles";

export default function AddNewFoodProduct() {
  return (
    <Container href="/foodProducts/add" aria-label="Open form add food product">
      <PlusIcon />
    </Container>
  );
}
