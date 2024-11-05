import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Plus, Trash2, Star, StarOff } from 'lucide-react';

const InterviewAssessmentTool = () => {
  const [candidateData, setCandidateData] = useState({
    name: '',
    date: '',
    currentRole: '',
    currentCompany: '',
    currentSalary: '',
    minimumSalary: '',
    noticePeriod: '',
    relocationOpen: false,
    notes: ''
  });

  const [scores, setScores] = useState({});
  const [notes, setNotes] = useState({});

  const sections = [
    {
      title: 'Paid Search Experience',
      questions: [
        'Describe your experience with Google Ads. What campaign types have you managed?',
        'What automated bidding strategies have you implemented and what were the results?',
        'How do you approach keyword research and account structure?',
        'What is your experience with shopping campaigns and feed optimization?',
        'Describe your experience with Microsoft Advertising (Bing Ads)'
      ]
    },
    {
      title: 'Paid Social Experience',
      questions: [
        'What social platforms have you run campaigns on?',
        'Describe your experience with Facebook Business Manager and ad formats',
        'How do you approach audience targeting and lookalike audiences?',
        'What is your experience with LinkedIn Advertising?',
        'How do you measure and optimize social campaign performance?'
      ]
    },
    {
      title: 'Display & Programmatic',
      questions: [
        'What DSPs have you worked with?',
        'Describe your experience with Google Display Network',
        'How do you approach audience segmentation in programmatic campaigns?',
        'What is your experience with dynamic creative optimization?',
        'How do you manage brand safety and fraud prevention?'
      ]
    },
    {
      title: 'Analytics & Reporting',
      questions: [
        'What analytics platforms are you proficient in?',
        'How do you approach attribution modeling?',
        'Describe your experience with tag management systems',
        'How do you measure ROAS across different channels?',
        'What custom reports have you built for stakeholders?'
      ]
    },
    {
      title: 'Client Experience',
      questions: [
        'What industries have you worked in?',
        'What was your largest client budget managed?',
        'How many clients do you manage simultaneously?',
        'Which geographic markets have you managed campaigns in?',
        'Describe your most successful campaign and its results'
      ]
    }
  ];

  const handleScoreChange = (sectionIndex, questionIndex, score) => {
    setScores({
      ...scores,
      [`${sectionIndex}-${questionIndex}`]: score
    });
  };

  const handleNotesChange = (sectionIndex, questionIndex, note) => {
    setNotes({
      ...notes,
      [`${sectionIndex}-${questionIndex}`]: note
    });
  };

  const handleInputChange = (field, value) => {
    setCandidateData({
      ...candidateData,
      [field]: value
    });
  };

  const StarRating = ({ value, onChange }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onChange(star)}
            className="focus:outline-none"
          >
            {star <= value ? (
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
            ) : (
              <Star className="w-5 h-5 text-gray-300" />
            )}
          </button>
        ))}
      </div>
    );
  };

  const generateReport = () => {
    const reportData = {
      candidateInfo: candidateData,
      assessmentData: sections.map(section => ({
        title: section.title,
        questions: section.questions.map((question, qIndex) => ({
          question,
          score: scores[`${sections.indexOf(section)}-${qIndex}`] || 0,
          notes: notes[`${sections.indexOf(section)}-${qIndex}`] || ''
        }))
      }))
    };

    const dataStr = JSON.stringify(reportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `${candidateData.name || 'candidate'}-assessment-${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <Card className="bg-white border-red-500 border-2">
        <CardHeader className="bg-red-500 text-white">
          <CardTitle className="text-2xl font-bold">Digital Marketing Interview Assessment</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-8 p-8 mt-4">
          {/* Candidate Information */}
          <div className="grid grid-cols-2 gap-6">
            <input
              className="p-2 border rounded"
              placeholder="Candidate Name"
              value={candidateData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
            <input
              className="p-2 border rounded"
              type="date"
              value={candidateData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
            />
            <input
              className="p-2 border rounded"
              placeholder="Current Role"
              value={candidateData.currentRole}
              onChange={(e) => handleInputChange('currentRole', e.target.value)}
            />
            <input
              className="p-2 border rounded"
              placeholder="Current Company"
              value={candidateData.currentCompany}
              onChange={(e) => handleInputChange('currentCompany', e.target.value)}
            />
            <input
              className="p-2 border rounded"
              placeholder="Current Salary"
              value={candidateData.currentSalary}
              onChange={(e) => handleInputChange('currentSalary', e.target.value)}
            />
            <input
              className="p-2 border rounded"
              placeholder="Minimum Required Salary"
              value={candidateData.minimumSalary}
              onChange={(e) => handleInputChange('minimumSalary', e.target.value)}
            />
            <input
              className="p-2 border rounded"
              placeholder="Notice Period"
              value={candidateData.noticePeriod}
              onChange={(e) => handleInputChange('noticePeriod', e.target.value)}
            />
            <div className="flex items-center">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={candidateData.relocationOpen}
                  onChange={(e) => handleInputChange('relocationOpen', e.target.checked)}
                  className="w-4 h-4"
                />
                <span>Open to Relocation</span>
              </label>
            </div>
          </div>

          {/* Assessment Sections */}
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-6">
              <h3 className="text-xl font-bold text-red-500">{section.title}</h3>
              {section.questions.map((question, questionIndex) => (
                <div key={questionIndex} className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium mb-3">{question}</p>
                  <div className="flex flex-col space-y-3">
                    <StarRating
                      value={scores[`${sectionIndex}-${questionIndex}`] || 0}
                      onChange={(value) => handleScoreChange(sectionIndex, questionIndex, value)}
                    />
                    <textarea
                      className="w-full p-2 border rounded"
                      placeholder="Notes..."
                      value={notes[`${sectionIndex}-${questionIndex}`] || ''}
                      onChange={(e) => handleNotesChange(sectionIndex, questionIndex, e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* Additional Notes */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-red-500">Additional Notes</h3>
            <textarea
              className="w-full p-2 border rounded h-32"
              placeholder="Additional notes about the candidate..."
              value={candidateData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <Button
              onClick={() => {
                setCandidateData({
                  name: '',
                  date: '',
                  currentRole: '',
                  currentCompany: '',
                  currentSalary: '',
                  minimumSalary: '',
                  noticePeriod: '',
                  relocationOpen: false,
                  notes: ''
                });
                setScores({});
                setNotes({});
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Form
            </Button>
            <Button
              onClick={generateReport}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewAssessmentTool;
