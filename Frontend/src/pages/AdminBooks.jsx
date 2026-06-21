import CrudPage from "../components/CrudPage";

export default function AdminBooks() {
    return (
        <CrudPage
            title="Manage Books"
            endpoint="/books"
            fields={[
                { name: "title", label: "Title", required: true },
                { name: "isbn", label: "ISBN" },
                { name: "publicationDate", label: "Publication Date", type: "date" },
                { name: "description", label: "Description" },
                { name: "authorId", label: "Author ID", type: "number", required: true },
                { name: "categoryId", label: "Category ID", type: "number", required: true },
            ]}
        />
    );
}