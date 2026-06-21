import CrudPage from "../components/CrudPage";

export default function AdminCategories() {
    return (
        <CrudPage
            title="Manage Categories"
            endpoint="/categories"
            fields={[
                { name: "name", label: "Name", required: true },
                { name: "description", label: "Description" },
            ]}
        />
    );
}