import { Input } from '@nextui-org/input';
import { SearchIcon } from '@/components/NavigationBar/SearchIcon';

export default function Home() {
  return (
    <main>
      <section className="grid grid-cols-2 gap-3 px-6 lg:px-14 py-14">
        <div>
          <h1 className="text-3xl font-bold">NexProjects</h1>
          <p className="text-lg">What is your next project?</p>
        </div>
        <div>
          <p>Test</p>
        </div>
      </section>
      <section className={'container mx-auto'}>
        <p>Make your search now!</p>
        <Input
          classNames={{
            base: 'max-w-full h-10',
            mainWrapper: 'h-full',
            input: 'text-small',
            inputWrapper:
              'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
      </section>
    </main>
  );
}
