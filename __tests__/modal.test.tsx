import Modal from '@/components/Modal';
import render from "./helpers/ProviderRender";

it('renders modal when isOpen is true', () => {
  const { getByRole } = render(
    <Modal isOpen={true} onClose={() => {}}>
      <p>Modal Content</p>
    </Modal>
  );
  const modal = getByRole('dialog');
  expect(modal).toBeInTheDocument();
});
