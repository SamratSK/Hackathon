<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use App\Models\Option;
use App\Models\Question;
use App\Models\Subject;
use App\Models\User;
use Illuminate\Http\Request;

class ExamController extends Controller
{
    #region Create
    public function store(Request $request)
    {
        $fields = $request->validate([
            'name' => 'string|required',
            'org_id' => 'int|required',
            'teacher_id' => 'int|required',
            'subjects' => 'array|required',
            'description' => 'string',

            // Subjects
            'subjects.*.name' => 'string|required',
            'subjects.*.questions' => 'array|required',

            // Questions
            'subjects.*.questions.*.content' => 'string|required',
            'subjects.*.questions.*.options' => 'array|required',

            // Options
            'subjects.*.questions.*.options.*.content' => 'string|required',
            'subjects.*.questions.*.options.*.correct' => 'boolean|required',
        ]);

        $subIds = [];
        foreach ($fields['subjects'] as $subject) {
            $sub = Subject::create([
                'name' => $subject['name'],
                'question_ids' => self::createQuestionIds($subject['questions'])
            ]);

            array_push($subIds, $sub->id);
        }

        $exam = Exam::create([
            'name' => $fields['name'],
            'org_id' => $fields['org_id'],
            'teacher_id' => $fields['teacher_id'],
            'subject_ids' => $subIds,
            'description' => $fields['description']
        ]);

        return response([
            'message' => 'The exam was successfully created.',
            'exam' => $exam
        ], 200);
    }
    #endregion

    #region Read
    public function index(Request $request, $id)
    {
        return Exam::where('org_id', '=', $id)->get();
    }

    public function show($id)
    {
        $exam = Exam::find($id);
        $teacher = User::find($id);
        $subjects = self::readSubjects($exam->subject_ids);

        unset($exam->teacher_id);
        $exam['teacher'] = $teacher;

        unset($exam->subject_ids);
        $exam['subjects'] = $subjects;

        return $exam;
    }
    #endregion

    // #region Update
    // public function update(Request $request, $id)
    // {
    //     $request->validate([
    //         'name' => 'string'
    //     ]);

    //     $organization = Organization::find($id);

    //     // Check if the resource is not null
    //     if ($organization === null) {
    //         return response([
    //             'message' => 'Unable to find organization.'
    //         ], 400);
    //     }

    //     $organization->update($request->all([
    //         'name'
    //     ]));

    //     return response([
    //         'message' => 'The organization was successfully updated.',
    //         'organization' => $organization,
    //     ], 200);
    // }
    // #endregion

    // #region Delete
    public function destroy(Request $request, $id)
    {
        $organization = Exam::find($id);

        // Check if the resource is not null
        if ($organization === null) {
            return response([
                'message' => 'Unable to find exam.'
            ], 400);
        }

        $organization->delete();

        return response([
            'message' => 'The exam was successfully deleted.',
        ], 200);
    }
    #endregion

    #region Private Functions
    private function createQuestionIds($questions)
    {
        $quesIds = [];
        foreach ($questions as $question) {
            $qsn = Question::create([
                'content' => $question['content'],
                'option_ids' => self::createOptionIds($question['options'])
            ]);

            array_push($quesIds, $qsn->id);
        }
        return $quesIds;
    }

    private function createOptionIds($options)
    {
        $optIds = [];
        foreach ($options as $option) {
            $opt = Option::create([
                'content' => $option['content'],
                'correct' => $option['correct']
            ]);

            array_push($optIds, $opt->id);
        }

        return $optIds;
    }

    private function readSubjects($subjectIds)
    {
        $subjects = [];
        foreach ($subjectIds as $subId) {
            $subject = Subject::find($subId);
            $subject['questions'] = self::readQuestions($subject->question_ids);
            unset($subject->question_ids);

            array_push($subjects, $subject);
        }
    }

    private function readQuestions($questionIds)
    {
        $questions = [];
        foreach ($questionIds as $queId) {
            $question = Question::find($queId);
            $question['options'] = self::readOptions($question->option_ids);
            unset($question->option_ids);

            array_push($questions, $question);
        }

        return $questions;
    }

    private function readOptions($optionIds)
    {
        $options = [];
        foreach ($optionIds as $optId) {
            array_push($options, Option::find($optId));
        }
        return $options;
    }
    #endregion
}
