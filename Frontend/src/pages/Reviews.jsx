import CrudPage from "../components/CrudPage";

export default function Reviews() {
    return (
        <CrudPage
            title="Reviews"
            endpoint="/reviews"
            fields={[
                {
                    name: "userId",
                    label: "User ID",
                    type: "number",
                    required: true,
                },
                {
                    name: "bookId",
                    label: "Book ID",
                    type: "number",
                    required: true,
                },
                {
                    name: "rating",
                    label: "Satisfaction",
                    type: "select",
                    required: true,
                    options: [
                        { value: 5, label: "Excellent ⭐⭐⭐⭐⭐" },
                        { value: 4, label: "Very Good ⭐⭐⭐⭐" },
                        { value: 3, label: "Good ⭐⭐⭐" },
                        { value: 2, label: "Average ⭐⭐" },
                        { value: 1, label: "Poor ⭐" }
                    ]
                }
            ]}
        />
    );
}