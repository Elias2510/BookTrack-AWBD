import CrudPage from "../components/CrudPage";

export default function Users() {
    return (
        <CrudPage
            title="Users"
            endpoint="/users"
            fields={[
                { name: "firstName", label: "First Name", required: true },
                { name: "lastName", label: "Last Name", required: true },
                { name: "email", label: "Email", type: "email", required: true },
                { name: "password", label: "Password", type: "password", required: true },
                { name: "roleId", label: "Role ID", type: "number", required: true },
            ]}
        />
    );
}