document.addEventListener('DOMContentLoaded', () => {
    let activkey;

    const getApiKey = async (username, password) => {
        try {
            const apiEndpoint = "https://api.hooktheory.com/v1/";
            const requestBody = { username, password };

            const response = await fetch(`${apiEndpoint}users/auth`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(requestBody)
            });

            const data = await response.json();

            if (data.activkey) {
                activkey = data.activkey;
                console.log("API Key obtained:", activkey);
            } else {
                console.error("Failed to obtain API key:", data);
            }
        } catch (error) {
            console.error("Error during API key request:", error);
        }
    };

    const generateChordProgression = async (mood) => {
        try {
            if (!activkey) {
                console.error("API key is missing. Please ensure it's obtained before making requests.");
                return;
            }

            const headers = {
                Authorization: `Bearer ${activkey}`,
                'Content-Type': 'application/json'
            };

            const num = Math.floor(Math.random() * 10) + '';
            const url = `https://api.hooktheory.com/v1/trends/nodes?cp=${num}`;

            const response = await fetch(url, { headers });

            if (!response.ok) {
                console.error('Failed to fetch chord progression. Please check your API key and try again.');
                return;
            }

            const data = await response.json();

            const chordProgression = processChordProgression(data);
            displayChordProgression(chordProgression);

            const videoUrls = {
                happy: [
                    "https://drive.google.com/file/d/1JcxPxYCy4Xt2OJGbfRfqJ60Uq3Ea0Sqd/preview",
                    "https://drive.google.com/file/d/14NzKPguCPyVe0uwwZtfhFc_5qdqT43Ho/preview",
                    "https://drive.google.com/file/d/1K2FZ1FlKB6kgcMQrR9eAl9nRjNtuOIwX/preview",
                    "https://drive.google.com/file/d/1ewUDn7rrF0V8iQS4yA1DfmxWojxCtGz5/preview",
                    "https://drive.google.com/file/d/1IL87YQwoq-ITmBCqbkND2rHpnIACOnFY/preview",
                    "https://drive.google.com/file/d/12YN_DDKFSnlLCSav4QD-pIP1jmx0Rprm/preview",
                    "https://drive.google.com/file/d/15raH4xvmlz9UlCr6F_wlFTdFMy3W9_e5/preview",
                    "https://drive.google.com/file/d/1CMfBdNmVTYPvT5LnJLLHSjrgbvgN9U-9/preview",
                    "https://drive.google.com/file/d/1XYE32rcvp4EhPw9tyWub-pc4jiy7nVIi/preview",
                    "https://drive.google.com/file/d/1PaXkdcJWEeAXYTY67lpQDIbgDpuuleT3/preview",
                    

                    // Add more video URLs for happy mood/genre
                ],
                sad: [
                    "https://drive.google.com/file/d/1rP9xZ0vPcekamXninvsfcKHkb3RthegC/preview",
                    "https://drive.google.com/file/d/1kmAGyZDqR9MC2Rh5NBGrcXhG59DOiJkB/preview",
                    "https://drive.google.com/file/d/1pjAdDOD1WiaI9zx_y83YK501k0Qc7Jv_/preview",
                    "https://drive.google.com/file/d/1tuZKTLuSMzOD9heJSpK8Fj6L55hGMkCn/preview",
                    "https://drive.google.com/file/d/1uq0a57rfoqOghPyTdJhti_nVCAm0HI_T/preview",
                    "https://drive.google.com/file/d/1HBQEY6rzZvl4IqbdgTYMh8J_nKLbm2PF/preview",
                    "https://drive.google.com/file/d/1hC-b2NsKZ0SU5VrC4ZZAAGofCCzM9isq/preview",
                    "https://drive.google.com/file/d/1IWuLSoGmA9qVSJFXb5CRyoPlFrPNBL85/preview",
                    "https://drive.google.com/file/d/12i_40JI2VWiWBnrjCCeY4JQmIQ3q5Ln9/preview",

                    // Add Google Drive embedded links for sad mood/genre
                ],
                chill: [
                    "https://drive.google.com/file/d/12bpb7n86C-TZmO8b90-AW60T1eZSIn-4/preview",
                    "https://drive.google.com/file/d/1RnYmd7O6aaD-gVbjHNDK2nlXvTzu2lk_/preview",
                    "https://drive.google.com/file/d/16iDmO5UuQDJcAwYKLbmxTaXB8agBPjRP/preview",
                    "https://drive.google.com/file/d/1NnAiSYLWyo_HTd7ffKEhs6G7GSG9S512/preview",
                    "https://drive.google.com/file/d/1m-7A--roHRWXF-jcoCMXH1e_A_5J8vlz/preview",
                    "https://drive.google.com/file/d/1Nia1t4zvlN8mRQdbwpww2U8eLCz4E31-/preview",
                    "https://drive.google.com/file/d/1YB7k7uh4EyU2GBRnkw5T6yzh96lpJsod/preview",
                    "https://drive.google.com/file/d/1zGdT_st5kq9RTc5VVsZVoqsQL1hrT-G4/preview",
                    "https://drive.google.com/file/d/1WihxfM3Bbb7X3GCDaoJMkVJr7h8PeBeg/preview",
                    "https://drive.google.com/file/d/1rtIs779oZSZIgAIT-deBwFGoJgtrdtil/preview",

                    // Add Google Drive embedded links for chill mood/genre
                ],
                jazz: [
                    "https://drive.google.com/file/d/15BGy9kE1jdy4fcHPGwHj8bdZMnzjW10e/preview",
                    "https://drive.google.com/file/d/1NHHGHjuE-zNKVC8LluKco66me9RN5jgv/preview",
                    "https://drive.google.com/file/d/1mFe4GiKzWvjoI4hz1kTnqwgZs_TZ__bG/preview",
                    "https://drive.google.com/file/d/1kodL_EYC5prCBVng046u-h0o9KnOBVGH/preview",
                    "https://drive.google.com/file/d/11BuZ8CfJWBTlGgfGJxnZ1lFYeo7rmyFa/preview",
                    "https://drive.google.com/file/d/1F-kBNmATIj8WFseIrtfNdnRqLDFkF9wO/preview",
                    "https://drive.google.com/file/d/1yTtfy7PrLP13Sdp_XI83XXvAD9cmuzJA/preview",
                    "https://drive.google.com/file/d/1o5jQ2C0J2S1AOzgV09ODJ5DFddzqs7h2/preview",
                    "https://drive.google.com/file/d/15BGy9kE1jdy4fcHPGwHj8bdZMnzjW10e/preview",
                    "https://drive.google.com/file/d/1rBPfjhoW4Os5Y5I6PV8yGxVgsGH4f2P2/preview",
                    "https://drive.google.com/file/d/1ANUKoacH8fL1lImbHIXIJ2MN9nE2H5O2/preview",

                    // Add Google Drive embedded links for jazz mood/genre
                ],
            };

            const videos = videoUrls[mood];
            const randomIndex = Math.floor(Math.random() * videos.length);
            const randomVideoUrl = videos[randomIndex];

            displayVideo(randomVideoUrl);
        } catch (error) {
            console.error('Error during chord progression request:', error);
        }
    };

    const processChordProgression = (data) => {
        const chordProgression = data.map(node => node.chord_HTML);
        const cleanedChords = formatChordProgression(chordProgression);
        return cleanedChords;
    };

    const formatChordProgression = (chordProgression, minLength = 4, maxLength = 8) => {
        const chordMap = {
            "I": "C",
            "IV": "F",
            "vi": "Am",
            "V": "G",
            "ii": "Dm",
            "iii": "Em",
            "vi7": "Am7",
            "IV7": "F7",
            "I6": "C6",
            "V6": "G6",
            "V/vi": "G",
            "iii7": "Em7",
            "I64": "C6/4",
            "V7": "G7",
            "♭VII": "Bb",
            "I7": "C7",
            "V/V": "D",
            "vi64": "Am6/4",
            "IV64": "F6/4",
            "V7/vi": "G7",
            "IV6": "F6",
            "vi6": "Am6",
            "V64": "G6/4",
            "vi4/2": "Am",
            "ii6": "Dm6",
            "iii6": "Em6",
            "V6/vi": "G",
            "♭VI": "Ab",
            "iii64": "Em6/4",
            "♭III": "Eb",
            "ii6/5": "Dm6/5",
            "V4/2": "G",
            "iv": "Dm",
            "iii6/5": "Em6/5",
            "vii°": "Bdim",
            "ii64": "Dm6/4",
            "V/ii": "A",
            "V7/ii": "A7",
            "vii°/vi": "Bdim",
            "vi6/5": "Am6/5",
            "V7/V": "D7",
            "V7/IV": "C7",
            "ii4/2": "Dm",
            "vii7": "Bdim7",
            "ii7": "Dm7",
            // Chord mapping logic here
        };

        const cleanedChords = chordProgression.map(chord => {
            chord = chord.replace(/<\/?sup>/g, '');
            chord = chord.replace(/&#9837;/g, '♭');
            chord = chord.replace(/<sub>|<\/sub>/g, '');
            return chordMap[chord] || chord;
        });

        const limitedChords = cleanedChords.slice(0, 8);

        return limitedChords;
    };

    const displayChordProgression = (chordProgression) => {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '';

        const paragraph = document.createElement('p');
        paragraph.textContent = `Chord Progression: ${chordProgression.join(' ')}`;
        resultDiv.appendChild(paragraph);
    };

    const displayVideo = (videoUrl) => {
        const videoContainer = document.getElementById('video-container');
        videoContainer.innerHTML = `
            <iframe src="${videoUrl}" width="640" height="480" allow="autoplay"></iframe>
        `;
    };

    const form = document.getElementById('mood-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const moodInput = document.getElementById('mood');
        const mood = moodInput.value;
        await generateChordProgression(mood);
    });

    const username = "alexmanayan";
    const password = "ManayanPiano21!";
    getApiKey(username, password);
});
