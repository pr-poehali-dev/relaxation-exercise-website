import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const Trainers = () => {
  const [activeTrainer, setActiveTrainer] = useState<string | null>(null);
  const [dotPosition, setDotPosition] = useState({ x: 50, y: 50 });
  const [focusSize, setFocusSize] = useState(100);
  const [lineAngle, setLineAngle] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (activeTrainer === 'moving-dot') {
      const interval = setInterval(() => {
        setDotPosition({
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10,
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [activeTrainer]);

  useEffect(() => {
    if (activeTrainer === 'focus-control') {
      const interval = setInterval(() => {
        setFocusSize((prev) => (prev === 100 ? 30 : 100));
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [activeTrainer]);

  useEffect(() => {
    if (activeTrainer === 'line-rotation') {
      const interval = setInterval(() => {
        setLineAngle((prev) => (prev + 15) % 360);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [activeTrainer]);

  const trainers = [
    {
      id: 'moving-dot',
      title: 'Следи за точкой',
      description: 'Следите глазами за движущейся точкой для тренировки координации',
      icon: 'Circle',
    },
    {
      id: 'focus-control',
      title: 'Контроль фокуса',
      description: 'Фокусируйтесь на объекте, который меняет размер',
      icon: 'ZoomIn',
    },
    {
      id: 'line-rotation',
      title: 'Вращающиеся линии',
      description: 'Следите за вращающимися линиями для тренировки периферического зрения',
      icon: 'RotateCw',
    },
  ];

  const renderTrainer = () => {
    switch (activeTrainer) {
      case 'moving-dot':
        return (
          <div className="relative w-full h-96 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl overflow-hidden">
            <div
              className="absolute w-6 h-6 bg-primary rounded-full transition-all duration-1000 ease-in-out"
              style={{
                left: `${dotPosition.x}%`,
                top: `${dotPosition.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-muted-foreground">
              Следите глазами за движущейся точкой
            </div>
          </div>
        );
      
      case 'focus-control':
        return (
          <div className="relative w-full h-96 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-2xl overflow-hidden flex items-center justify-center">
            <div
              className="bg-accent rounded-full transition-all duration-1000 ease-in-out"
              style={{
                width: `${focusSize}px`,
                height: `${focusSize}px`,
              }}
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-muted-foreground">
              Удерживайте фокус на изменяющемся круге
            </div>
          </div>
        );
      
      case 'line-rotation':
        return (
          <div className="relative w-full h-96 bg-gradient-to-br from-accent/10 to-secondary/10 rounded-2xl overflow-hidden flex items-center justify-center">
            <div
              className="absolute w-1 h-32 bg-primary transition-transform duration-1000 ease-linear"
              style={{ transform: `rotate(${lineAngle}deg)` }}
            />
            <div
              className="absolute w-1 h-32 bg-secondary transition-transform duration-1000 ease-linear"
              style={{ transform: `rotate(${lineAngle + 90}deg)` }}
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-muted-foreground">
              Следите за вращением линий
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/20 via-primary/20 to-secondary/20">
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
            Интерактивные тренажеры
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Динамические упражнения для развития остроты зрения, координации и периферического восприятия
          </p>
        </div>

        {activeTrainer ? (
          <div className="max-w-4xl mx-auto space-y-6 animate-scale-in">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-2xl font-semibold text-primary-foreground">
                {trainers.find(t => t.id === activeTrainer)?.title}
              </h2>
              <Button onClick={() => setActiveTrainer(null)} variant="outline">
                <Icon name="X" size={16} className="mr-2" />
                Закрыть
              </Button>
            </div>
            
            {renderTrainer()}

            <Card className="bg-primary/10 border-2">
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  Совет: Держите голову неподвижно и двигайте только глазами
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {trainers.map((trainer, index) => (
              <Card 
                key={trainer.id}
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-scale-in border-2 cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setActiveTrainer(trainer.id)}
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-accent/30 flex items-center justify-center mb-4">
                    <Icon name={trainer.icon as any} size={24} className="text-accent-foreground" />
                  </div>
                  <CardTitle className="font-heading text-xl">{trainer.title}</CardTitle>
                  <CardDescription className="text-base">{trainer.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Icon name="Play" size={16} className="mr-2" />
                    Запустить тренажер
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!activeTrainer && (
          <div className="mt-16 max-w-3xl mx-auto">
            <Card className="bg-primary/20 border-2">
              <CardHeader>
                <CardTitle className="font-heading text-2xl flex items-center gap-2">
                  <Icon name="Sparkles" size={24} className="text-primary-foreground" />
                  Как использовать тренажеры
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>• Выберите один из тренажеров для начала работы</p>
                <p>• Держите экран на комфортном расстоянии (50-70 см)</p>
                <p>• Выполняйте упражнение 1-2 минуты, затем сделайте перерыв</p>
                <p>• Используйте тренажеры 2-3 раза в день для лучшего эффекта</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trainers;
