import "../App.css";
import {
  InputGroup,
  FormControl,
  Form,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";

export const TableFilter = ({ setFilterCategory, setFilterText }) => {
  const handleSelect = (e) => {
    setFilterCategory(e.target.value);
  };

  const handleForm = (e) => {
    setFilterText(e.target.value);
  };

  return (
    <InputGroup className="mb-3">
      {/* <DropdownButton
        variant="outline-secondary"
        title="Dropdown"
        id="input-group-dropdown-1"
        onSelect={handleSelect}
      >
        <Dropdown.Item eventKey="title">Title</Dropdown.Item>
        <Dropdown.Item eventKey="year">Year</Dropdown.Item>
        <Dropdown.Item eventKey="genre">Genre</Dropdown.Item>
      </DropdownButton> */}
      <div style={{ width: "10em" }}>
        <Form.Select
          onChange={handleSelect}
          aria-label="Default select example"
        >
          <option value="title">Title</option>
          <option value="year">Year</option>
          <option value="genre">Genre</option>
        </Form.Select>
      </div>
      <FormControl aria-label="Filter table" onChange={handleForm} />
    </InputGroup>
  );
};
