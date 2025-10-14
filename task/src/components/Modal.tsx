import type { IusersData } from "../pages/dashboard";

interface IModalProps {
  onClose: () => void;
  user: IusersData;
}

const Modal = ({ onClose, user }: IModalProps) => {
      const userFields: { label: string; value: string | number }[] = [
    { label: "ID", value: user.id },
    { label: "Full Name", value: `${user.first_name} ${user.middle_name} ${user.last_name}` },
    { label: "User Name", value: user.username },
    { label: "Password", value: user.password },
    { label: "Email", value: user.email },
    { label: "Address", value: user.address },
    { label: "Country", value: user.country },
  ];
  return (
     <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="modal-close" onClick={onClose}>✖</span>
        <h3>Subscriber Details</h3>
        <div className="modal-fields">
          {userFields.map((field, index) => (
            <p key={index}>
              <strong>{field.label}:</strong> {field.value}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Modal;
