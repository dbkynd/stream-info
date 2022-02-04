interface HostData {
  username: string;
  viewers: number;
  autohost: boolean;
  raid: boolean;
}

export default (host: HostData): void => {
  console.log('new host/raid');
};
