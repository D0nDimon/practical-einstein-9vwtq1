import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "/components/ui/card";
import { Input } from "/components/ui/input";
import { Label } from "/components/ui/label";
import { Button } from "/components/ui/button";
import { Textarea } from "/components/ui/textarea";

export default function App() {
  const [twitchApiKey, setTwitchApiKey] = useState('');
  const [gptApiKey, setGptApiKey] = useState('');
  const [twitchChannelUrl, setTwitchChannelUrl] = useState('');
  const [keywords, setKeywords] = useState([{ keyword: '', prompt: '' }]);
  const [newKeyword, setNewKeyword] = useState('');
  const [newPrompt, setNewPrompt] = useState('');

  const handleAddKeyword = () => {
    setKeywords([...keywords, { keyword: newKeyword, prompt: newPrompt }]);
    setNewKeyword('');
    setNewPrompt('');
  };

  const handleRemoveKeyword = (index) => {
    setKeywords(keywords.filter((keyword, i) => i !== index));
  };

  return (
    <Card className="max-w-md mx-auto p-4">
      <CardHeader>
        <CardTitle>Чат-бот на Twitch</CardTitle>
        <CardDescription>Введите ключи API и настройки чат-бота</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="mb-4">
            <Label htmlFor="twitch-api-key">Ключ API Twitch:</Label>
            <Input id="twitch-api-key" type="text" value={twitchApiKey} onChange={(e) => setTwitchApiKey(e.target.value)} />
          </div>
          <div className="mb-4">
            <Label htmlFor="gpt-api-key">Ключ API GPT:</Label>
            <Input id="gpt-api-key" type="text" value={gptApiKey} onChange={(e) => setGptApiKey(e.target.value)} />
          </div>
          <div className="mb-4">
            <Label htmlFor="twitch-channel-url">Ссылка на канал Twitch:</Label>
            <Input id="twitch-channel-url" type="text" value={twitchChannelUrl} onChange={(e) => setTwitchChannelUrl(e.target.value)} />
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-bold">Ключевые слова и промты</h2>
            {keywords.map((keyword, index) => (
              <div key={index} className="space-y-2">
                <Label>Ключевое слово</Label>
                <Input value={keyword.keyword} onChange={(e) => setKeywords(keywords.map((k, i) => i === index ? { ...k, keyword: e.target.value } : k))} />
                <Label>Промт</Label>
                <Textarea value={keyword.prompt} onChange={(e) => setKeywords(keywords.map((k, i) => i === index ? { ...k, prompt: e.target.value } : k))} />
                <Button variant="destructive" onClick={() => handleRemoveKeyword(index)}>Удалить</Button>
              </div>
            ))}
            <div className="space-y-2">
              <Label>Новое ключевое слово</Label>
              <Input value={newKeyword} onChange={(e) => setNewKeyword(e.target.value)} />
              <Label>Новый промт</Label>
              <Textarea value={newPrompt} onChange={(e) => setNewPrompt(e.target.value)} />
              <Button onClick={handleAddKeyword}>Добавить</Button>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <p>После сохранения настроек чат-бот будет готов к работе.</p>
      </CardFooter>
    </Card>
  );
}