import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const exercises = [
  {
    id: 1,
    title: 'Пальминг',
    description: 'Разогрейте ладони и приложите к закрытым глазам без давления',
    duration: 120,
    icon: 'Hand',
  },
  {
    id: 2,
    title: 'Моргание',
    description: 'Быстро моргайте 20 раз, затем закройте глаза на 5 секунд',
    duration: 60,
    icon: 'Eye',
  },
  {
    id: 3,
    title: 'Взгляд вдаль',
    description: 'Смотрите на дальний объект 20 секунд, затем на ближний',
    duration: 90,
    icon: 'Focus',
  },
  {
    id: 4,
    title: 'Круговые движения',
    description: 'Медленно вращайте глазами по часовой стрелке, затем против',
    duration: 45,
    icon: 'Rotate3d',
  },
  {
    id: 5,
    title: 'Массаж век',
    description: 'Легкими движениями массируйте верхние и нижние веки',
    duration: 60,
    icon: 'Activity',
  },
];

const Relaxation = () => {
  const [activeExercise, setActiveExercise] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setActiveExercise(null);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const startExercise = (exercise: typeof exercises[0]) => {
    setActiveExercise(exercise.id);
    setTimeLeft(exercise.duration);
    setIsRunning(true);
  };

  const stopExercise = () => {
    setIsRunning(false);
    setActiveExercise(null);
    setTimeLeft(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
      <nav className="bg-white/80 backdrop-blur-md border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Icon name="Eye" size={28} className="text-primary-foreground" />
            <span className="font-heading font-semibold text-xl text-primary-foreground">Здоровье Глаз</span>
          </Link>
          <div className="flex gap-2">
            <Link to="/">
              <Button variant="ghost" size="sm">Расслабление</Button>
            </Link>
            <Link to="/astigmatism">
              <Button variant="ghost" size="sm">Астигматизм</Button>
            </Link>
            <Link to="/trainers">
              <Button variant="ghost" size="sm">Тренажеры</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="font-heading text-5xl font-bold text-primary-foreground mb-4">
            Упражнения на расслабление глаз
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Комплекс упражнений для снятия усталости и напряжения глаз после работы за компьютером
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {exercises.map((exercise, index) => (
            <Card 
              key={exercise.id} 
              className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-scale-in border-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Icon name={exercise.icon as any} size={24} className="text-primary-foreground" />
                </div>
                <CardTitle className="font-heading text-xl">{exercise.title}</CardTitle>
                <CardDescription className="text-base">{exercise.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {activeExercise === exercise.id ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-primary-foreground animate-pulse-soft">
                        {timeLeft}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">секунд осталось</div>
                    </div>
                    <Button 
                      onClick={stopExercise} 
                      variant="outline" 
                      className="w-full"
                    >
                      <Icon name="Square" size={16} className="mr-2" />
                      Остановить
                    </Button>
                  </div>
                ) : (
                  <Button 
                    onClick={() => startExercise(exercise)} 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    disabled={activeExercise !== null}
                  >
                    <Icon name="Play" size={16} className="mr-2" />
                    Начать ({exercise.duration}с)
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 max-w-3xl mx-auto">
          <Card className="bg-secondary/30 border-2">
            <CardHeader>
              <CardTitle className="font-heading text-2xl flex items-center gap-2">
                <Icon name="Lightbulb" size={24} className="text-secondary-foreground" />
                Рекомендации
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>• Выполняйте упражнения каждые 2 часа работы за компьютером</p>
              <p>• Старайтесь делать упражнения в спокойной обстановке</p>
              <p>• Не напрягайте глаза во время выполнения</p>
              <p>• При дискомфорте прекратите упражнение</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Relaxation;
