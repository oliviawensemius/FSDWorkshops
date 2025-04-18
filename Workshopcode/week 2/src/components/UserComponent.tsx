interface UserComponentProps {
    name: string, 
    age: number,
    firstName: string, 
    lastName: string,
    onClick: () => void
}

const UserComponent = ({ name, age, onClick }: UserComponentProps) => {
    return (
        <>
            <h1>User Name: {name}</h1>
            <h1>User Age: {age}</h1>
            <button onClick={onClick}>Click Me!</button>
        </>
    )
}

export default UserComponent;