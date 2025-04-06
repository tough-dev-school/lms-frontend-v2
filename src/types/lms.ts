export interface Lesson {
  id: number;
  name: string;
  material?: {
    id: number;
    title: string;
  };
  homework: {
    is_sent: boolean;
    crosschecks: {
      total: number;
      checked: number;
    };
    question: {
      slug: string;
      name: string;
      text: string;
      deadline: string;
    };
  };
}

export interface Module {
  id: number;
  name: string;
}
