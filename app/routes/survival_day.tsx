import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams, useSearchParams } from "react-router"

export default function SurivalDayPage () {
    const { survivalDayId } = useParams();
    const { data: survivalDay } = useQuery({
        queryKey: ['survival_day_id', survivalDayId],
        queryFn: () => { return }
    })
    return (
        <div>
            {/* {survival_day} */}
        </div>
    )
}