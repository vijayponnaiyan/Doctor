import { useState, useEffect } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { Radio, RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import classNames from '../../layout/dashboardComps/helper';

const notesLists = [
  { id: 1, title: 'Progress Notes', description: 'These are general notes which can be taken during appointments with the clients. These notes are visible to all other clinicians in the organization', users: '621 users', url: 'progress' },
  { id: 2, title: 'Clinician Notes', description: 'These are notes which maintain Clinician Patient confidentiality. They are not visible to anyone except the note taker.', users: '1200 users', url: 'clinician' },
  { id: 3, title: 'Diagnosis and Treatment', description: 'Last message sent 4 days ago', users: '2740 users', url: 'dnt' },
];

export default function ClientNotes() {
  const [selectedNotesList, setSelectedNotesList] = useState(notesLists[0]);
  const data = useLoaderData();
  const navigate = useNavigate();
  const { clientId } = useParams();

  useEffect(() => {
    navigate(`/dashboard/clients/${clientId}/notes/${selectedNotesList.url}`);
    console.log(data);
  }, [selectedNotesList, navigate, clientId]);

  const cardStyle = {
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    transition: '0.3s',
    padding: '16px',
    borderRadius: '5px',
    backgroundColor: '#fff',
    marginTop: '20px',
  };
  const ComAnter={
    textAlign:'center', 
  }; 


  const getProgress = () => {
    return (notesLists.findIndex(note => note.id === selectedNotesList.id) + 1) / notesLists.length * 100;
  };

  return (
    <>
      {/* {JSON.stringify(data)} */}
      <fieldset>
        <RadioGroup
          value={selectedNotesList}
          onChange={setSelectedNotesList}
          className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4"
        >
          {notesLists.map((notesList) => (
            <Radio
              key={notesList.id}
              value={notesList}
              aria-label={notesList.title}
              aria-description={`${notesList.description} to ${notesList.users}`}
              className={({ focus }) =>
                classNames(
                  focus ? 'border-indigo-600 ring-2 ring-indigo-600' : '',
                  !focus ? 'border-gray-300' : '',
                  'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
                )
              }
            >
              {({ checked, focus }) => (
                <>
                  <span className="flex flex-1">
                    <span className="flex flex-col">
                      <span className="block text-sm font-medium text-gray-900">{notesList.title}</span>
                      <span className="mt-1 flex items-center text-sm text-gray-500">{notesList.description}</span>
                      <span className="mt-6 text-sm font-medium text-gray-900">{notesList.users}</span>
                    </span>
                  </span>
                  <CheckCircleIcon
                    className={classNames(!checked ? 'invisible' : '', 'h-5 w-5 text-indigo-600')}
                    aria-hidden="true"
                  />
                  <span
                    className={classNames(
                      checked ? 'border-indigo-600' : 'border-transparent',
                      focus ? 'border' : 'border-2',
                      'pointer-events-none absolute -inset-px rounded-lg'
                    )}
                    aria-hidden="true"
                  />
                </>
              )}
            </Radio>
          ))}
        </RadioGroup>
      </fieldset>
      <div>
        <h2>Selected Notes List:</h2>
        <div style={cardStyle}>
          {/* <pre>{JSON.stringify(selectedNotesList, null, 2)}</pre> */}
          {Object.entries(selectedNotesList).map(([key, value], index) => (
            <div key={index}   style={ComAnter}   >
              <span  >{key}: {value}</span>
              
            </div>
          ))}
        </div>
      </div> 
      <div style={cardStyle}>
        <h2>Progress</h2>
        <div style={{ backgroundColor: '#f3f4f6', borderRadius: '5px', overflow: 'hidden', marginTop: '10px' }}>
          <div
            style={{
              width: `${getProgress()}%`,
              backgroundColor: 'DodgerBlue',
              color: 'white',
              textAlign: 'center',
              padding: '10px 0',
            }}
          >
            {Math.round(getProgress())}%
          </div>
        </div>
      </div>
    </>
  );
}
