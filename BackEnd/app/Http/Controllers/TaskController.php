<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{

    public function create(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'priority' => 'required'
        ]);

        $user_id = auth()->user()->id;

        $task = new Task();
        $task->user_id = $user_id;
        $task->name = $request->name;
        $task->description = $request->description;
        $task->priority = $request->priority;
        $task->date = $request->date;
        $task->is_completed = false;

        $task->save();

        return response([
            'status' => 1,
            'msg' => 'Task Created!'
        ]);
    }

    public function listTask(Request $request)
    {
        $user_id = auth()->user()->id;
        $data = Task::where(['user_id' => $user_id, 'is_completed' => false])->get();

        return response([
            'status' => 1,
            'msg' => 'List Tasks',
            'data' => $data
        ]);
    }

    public function listTaskCompleted(Request $request)
    {
        $user_id = auth()->user()->id;
        $data = Task::where(['user_id' => $user_id, 'is_completed' => true])->get();

        return response([
            'status' => 1,
            'msg' => 'List Tasks Completed',
            'data' => $data
        ]);
    }

    public function update(Request $request, $id)
    {
        $user_id = auth()->user()->id;

        if (Task::where(['user_id' => $user_id, 'id' => $id])->exists()) {
            $task = Task::where(['user_id' => $user_id, 'id' => $id])->first();

            $request->validate([
                'name' => 'required',
                'priority' => 'required'
            ]);

            $task->name = $request->name;
            $task->description = $request->description;
            $task->priority = $request->priority;
            $task->date = $request->date;

            $task->save();

            return response([
                'status' => 1,
                'msg' => 'Task Updated'
            ]);
        } else {
            return response([
                'status' => 0,
                'msg' => 'Task Not Found'
            ], 404);
        }
    }

    public function completed($id)
    {

        $user_id = auth()->user()->id;

        if (Task::where(['user_id' => $user_id, 'id' => $id])->exists()) {
            $task = Task::where(['user_id' => $user_id, 'id' => $id])->first();
            $task->is_completed = true;
            $task->save();

            return response([
                'status' => 1,
                'msg' => 'Task Completed'
            ]);
        } else {
            return response([
                'status' => 0,
                'msg' => 'Task Not Found'
            ], 404);
        }
    }

    public function delete($id)
    {
        $user_id = auth()->user()->id;

        if (Task::where(['user_id' => $user_id, 'id' => $id])->exists()) {
            $task = Task::where(['user_id' => $user_id, 'id' => $id])->first();

            $task->delete();

            return response([
                'status' => 1,
                'msg' => 'Task Deleted'
            ]);
        } else {
            return response([
                'status' => 0,
                'msg' => 'Task Not Found'
            ], 404);
        }
    }
}
