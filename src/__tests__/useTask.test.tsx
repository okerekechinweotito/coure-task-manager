import { renderHook, act } from "@testing-library/react";
import useTasks, { Task } from "@/shared/hooks/useTask";

describe("useTasks", () => {
  const mockTask: Task = {
    id: "1",
    title: "Test Task",
    description: "Test Description",
    dueDate: "2024-01-01",
    priority: "High",
    status: "Pending",
  };

  const mockTask2: Task = {
    id: "2",
    title: "Second Task",
    description: "Another Description",
    dueDate: "2024-01-02",
    priority: "Low",
    status: "Completed",
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it("should initialize with empty tasks array", () => {
    const { result } = renderHook(() => useTasks());
    expect(result.current.tasks).toEqual([]);
  });

  it("should add a new task", () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.addTask(mockTask);
    });

    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0]).toEqual(mockTask);
  });

  it("should update an existing task", () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.addTask(mockTask);
    });

    const updatedTask = { ...mockTask, title: "Updated Title" };

    act(() => {
      result.current.updateTask(mockTask.id, updatedTask);
    });

    expect(result.current.tasks[0].title).toBe("Updated Title");
  });

  it("should delete a task", () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.addTask(mockTask);
    });

    act(() => {
      result.current.deleteTask(mockTask.id);
    });

    expect(result.current.tasks).toHaveLength(0);
  });

  it("should get task by id", () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.addTask(mockTask);
    });

    const foundTask = result.current.getTaskById(mockTask.id);
    expect(foundTask).toEqual(mockTask);
  });

  it("should return undefined for non-existent task id", () => {
    const { result } = renderHook(() => useTasks());
    const foundTask = result.current.getTaskById("non-existent-id");
    expect(foundTask).toBeUndefined();
  });

  describe("filterTasks", () => {
    beforeEach(() => {
      const { result } = renderHook(() => useTasks());
      act(() => {
        result.current.addTask(mockTask);
        result.current.addTask(mockTask2);
      });
    });

    it("should filter tasks by priority", () => {
      const { result } = renderHook(() => useTasks());
      const filteredTasks = result.current.filterTasks(["High"]);

      expect(filteredTasks).toHaveLength(1);
      expect(filteredTasks[0].priority).toBe("High");
    });

    it("should filter tasks by status", () => {
      const { result } = renderHook(() => useTasks());
      const filteredTasks = result.current.filterTasks(["Completed"]);

      expect(filteredTasks).toHaveLength(1);
      expect(filteredTasks[0].status).toBe("Completed");
    });

    it("should filter tasks by multiple criteria", () => {
      const { result } = renderHook(() => useTasks());
      const filteredTasks = result.current.filterTasks(["High", "Completed"]);

      expect(filteredTasks).toHaveLength(2);
    });
  });
});
