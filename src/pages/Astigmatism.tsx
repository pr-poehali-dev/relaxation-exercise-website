import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const exercises = [
  {
    id: 1,
    title: 'Фокусировка на ближнем объекте',
    description: 'Держите палец на расстоянии 15 см от глаз, фокусируйтесь на нем 10 секунд',
    duration: 90,
    icon: 'Target',
  },
  {
    id: 2,
    title: 'Упражнение "Восьмерка"',
    description: 'Рисуйте глазами воображаемую восьмерку на расстоянии 2-3 метров',
    duration: 60,
    icon: 'Infinity',
  },
  {
    id: 3,
    title: 'Чтение с расстояния',
    description: 'Читайте текст с разных расстояний: близко, средне, далеко',
    duration: 120,
    icon: 'BookOpen',
  },
  {
    id: 4,
    title: 'Движение по диагонали',
    description: 'Медленно переводите взгляд из верхнего левого угла в нижний правый',
    duration: 45,
    icon: 'MoveUpRight',
  },
  {
    id: 5,
    title: 'Концентрация на линиях',
    description: 'Фокусируйтесь на горизонтальных и вертикальных линиях поочередно',
    duration: 75,
    icon: 'Rows3',
  },
  {
    id: 6,
    title: 'Упражнение "Маятник"',
    description: 'Плавно переводите взгляд слева направо, как маятник часов',
    duration: 60,
    icon: 'Timer',
  },
];

const Astigmatism = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-secondary/20 via-accent/20 to-primary/20">
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
            Упражнения от астигматизма
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Специальный комплекс для коррекции астигматизма и улучшения четкости зрения
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
                <div className="w-12 h-12 rounded-full bg-secondary/30 flex items-center justify-center mb-4">
                  <Icon name={exercise.icon as any} size={24} className="text-secondary-foreground" />
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
                    className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
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
          <Card className="bg-accent/30 border-2">
            <CardHeader>
              <CardTitle className="font-heading text-2xl flex items-center gap-2">
                <Icon name="Info" size={24} className="text-accent-foreground" />
                Важная информация
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>• Упражнения не заменяют лечение, назначенное врачом</p>
              <p>• Регулярность важнее интенсивности - выполняйте ежедневно</p>
              <p>• Первые результаты можно заметить через 2-3 недели</p>
              <p>• При ухудшении зрения обратитесь к офтальмологу</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Astigmatism;
