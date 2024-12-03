import React, { useState } from 'react';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { Button } from '@mui/material';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

function EmojiPicker({ onEmojiSelect }) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div>
      <Button onClick={() => setShowPicker(!showPicker)}>
        <InsertEmoticonIcon />
      </Button>
      {showPicker && (
        <Picker
          data={data}
          onEmojiSelect={(emoji) => {
            onEmojiSelect(emoji);
            setShowPicker(false);
          }}
          style={{ position: 'absolute', bottom: '80px', right: '20px' }}
        />
      )}
    </div>
  );
}

export default EmojiPicker;