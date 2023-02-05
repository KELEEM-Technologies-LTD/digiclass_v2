import { useState } from "react"
import InputWithIcon from "../InputFields/InputWithIcon"

const NavBarSeacrhField = () => {
    const [qry, setQry] = useState('')
    return (
        <>
            <InputWithIcon
                placeholder={"What do you want to learn?"}
                className="flex py-2 rounded-5 bg-primary-100 justify-between text-black"
                icon="fa fa-search text-sm text-secondary-500"
                disabled={false}
                value={qry}
                onChange={e => setQry(e.target.value)}
            />
        </>
    )
}

export default NavBarSeacrhField