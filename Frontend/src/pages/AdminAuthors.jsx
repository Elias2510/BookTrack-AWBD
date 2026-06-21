import CrudPage from "../components/CrudPage";

export default function AdminAuthors() {
    return (
        <CrudPage
            title="Manage Authors"
            endpoint="/authors"
            fields={[
                { name: "name", label: "Name", required: true },
                { name: "biography", label: "Biography" },
                { name: "birthDate", label: "Birth Date", type: "date" },
            ]}
        />
    );
}