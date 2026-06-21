import CrudPage from "../components/CrudPage";

export default function AdminReviews() {
    return (
        <CrudPage
            title="Manage Reviews"
            endpoint="/reviews"
            fields={[
                { name: "userId", label: "User ID", type: "number", required: true },
                { name: "bookId", label: "Book ID", type: "number", required: true },
                { name: "rating", label: "Rating", type: "number", required: true },
                { name: "comment", label: "Comment" },
            ]}
        />
    );
}