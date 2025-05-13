import { useQuery } from "@tanstack/react-query";
import fetchSinglePrerequisiite from "../services/fetchSinglePrerequisiite";

const useSinglePrerequisite = (id: string) => {

    return useQuery({
        queryKey: ["prerequisites", id],
        queryFn: () => fetchSinglePrerequisiite(id),
    });
};

export default useSinglePrerequisite;
