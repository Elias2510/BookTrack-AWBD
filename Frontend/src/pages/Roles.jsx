import CrudPage from "../components/CrudPage";

export default function Roles() {
    return (
        <CrudPage
            title="Roles"
            endpoint="/roles"
            fields={[
                { name: "name", label: "Role Name", required: true },
            ]}
        />
    );
}