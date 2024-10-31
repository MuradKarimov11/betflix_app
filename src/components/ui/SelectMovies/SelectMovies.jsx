import { Skeleton, Stack } from "@mui/material"
import React from "react"


export const SelectMovies = () => {
    return (
        <>
            <Skeleton
                animation="wave"
                variant="rectangular"
                height="322px"
                width="215px"
                sx={{ mt: 2, mb: 2 }}
            />
            <Stack direction="row" justifyContent="center" flexWrap="wrap">
                {Array(15)
                    .fill(null)
                    .map((_, index) => (
                        <React.Fragment key={index}>

                            <Stack flexDirection="column">
                                <Skeleton
                                    animation="wave"
                                    variant="rectangular"
                                    height="322px"
                                    width="215px"
                                />
                                <Skeleton animation="wave" variant="text" width="120px" />
                                <Skeleton animation="wave" variant="text" width="120px" />
                            </Stack>
                        </React.Fragment>
                    ))}
            </Stack>
        </>
    )
}
