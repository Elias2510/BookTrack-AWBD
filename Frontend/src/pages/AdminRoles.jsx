import CrudPage from "../components/CrudPage";

export default function AdminRoles() {
    return (
        <CrudPage
            title="Manage Roles"
            endpoint="/roles"
            fields={[
                { name: "name", label: "Role Name", required: true },
            ]}
        />
    );
}