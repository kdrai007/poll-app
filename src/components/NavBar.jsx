export const NavBar = ({ setCreatingPoll }) => {
  return (
    <nav className="navbar navbar-expand-lg d-flex justify-content-between align-items-center">
      <span onClick={() => setCreatingPoll(false)} className="navbar-brand cursor-pointer">Home</span>
      <span className="cursor-pointer" onClick={() => setCreatingPoll(true)}>create polls</span>
    </nav>
  )
}
