import { useState } from 'react'
import { NavBar } from './components/NavBar'
import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect } from 'react';
import { Tags } from './components/Tags';
import { ShowPolls } from './components/ShowPolls';
import { CreatePoll } from './components/CreatePoll';

function App() {
  const [polls, setPolls] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("all");
  const [creatingPoll, setCreatingPoll] = useState(false);
  const [reloadPolls, setReloadPolls] = useState(false);

  useEffect(() => {
    async function fetchTags() {
      const response = await fetch('http://localhost:3000/api/tags')
      const json = await response.json()
      setTags(json.data)
    }
    fetchTags();
  }, [])

  useEffect(() => {
    async function fetchPolls() {
      if (selectedTag === "all") {
        const response = await fetch('http://localhost:3000/api/all-polls')
        const json = await response.json()
        console.log(json);
        setPolls(json.data)
      } else {
        const response = await fetch(`http://localhost:3000/api/tag-polls?tag=${selectedTag}`)
        const json = await response.json()
        console.log(json.data);
        setPolls(json.data)
      }
    }
    fetchPolls();
  }, [selectedTag, reloadPolls])


  return (
    <main>
      <NavBar setCreatingPoll={setCreatingPoll} />
      {!creatingPoll ?
        <>
          <Tags tags={tags} setSelectedTag={setSelectedTag} selectedTag={selectedTag} />
          <ShowPolls polls={polls} setReloadPolls={setReloadPolls} />
        </>
        :
        <CreatePoll tags={tags} setCreatingPoll={setCreatingPoll} setReloadPolls={setReloadPolls} />
      }
    </main>
  )
}

export default App
