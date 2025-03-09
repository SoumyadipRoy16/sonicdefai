export default function Stat() {
  return (
    <section id="stats" className="py-12 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <div className="bg-background rounded-lg p-6 shadow-sm border flex flex-col items-center text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-primary">
              2.5M+
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              Tweets Analyzed
            </p>
          </div>
          <div className="bg-background rounded-lg p-6 shadow-sm border flex flex-col items-center text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-primary">85%</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Prediction Accuracy
            </p>
          </div>
          <div className="bg-background rounded-lg p-6 shadow-sm border flex flex-col items-center text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-primary">
              50K+
            </h3>
            <p className="text-sm text-muted-foreground mt-2">Active Users</p>
          </div>
          <div className="bg-background rounded-lg p-6 shadow-sm border flex flex-col items-center text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-primary">
              250+
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              Crypto Celebrities
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
